# ============================================================
# Genera el favicon (app/icon.png y app/apple-icon.png) y la
# imagen Open Graph (public/images/og.jpg) a partir de los
# logos reales de la marca. Script de un solo uso.
# ============================================================
Add-Type -AssemblyName System.Drawing

$raiz = "c:\Users\andse\Documents\panamericana_sur"
$logos = "$raiz\public\images\logos"
$navy = [System.Drawing.Color]::FromArgb(255, 30, 35, 71) # #1E2347

# ------------------------------------------------------------
# 1. Detectar el recuadro del simbolo "P" (primer glifo) en el
#    logo blanco de Panamericana, escaneando el canal alfa.
# ------------------------------------------------------------
$logo = [System.Drawing.Bitmap]::FromFile("$logos\logo-panamericana-blanco.png")

$columnas = @{}
$maxX = [Math]::Min(340, $logo.Width - 1)
for ($x = 0; $x -le $maxX; $x++) {
    $tiene = $false
    for ($y = 0; $y -lt $logo.Height; $y += 2) {
        if ($logo.GetPixel($x, $y).A -gt 30) { $tiene = $true; break }
    }
    $columnas[$x] = $tiene
}

# Primer borde con contenido y primer hueco (>=4 columnas vacias) despues
$inicio = -1
foreach ($x in 0..$maxX) { if ($columnas[$x]) { $inicio = $x; break } }
$fin = -1
$vacias = 0
for ($x = $inicio; $x -le $maxX; $x++) {
    if (-not $columnas[$x]) { $vacias++ } else { $vacias = 0 }
    if ($vacias -ge 4) { $fin = $x - $vacias; break }
}
if ($fin -lt 0) { $fin = [Math]::Min($inicio + $logo.Height, $maxX) } # respaldo: recorte cuadrado

# Limites verticales dentro de ese rango
$arriba = $logo.Height; $abajo = 0
for ($x = $inicio; $x -le $fin; $x++) {
    for ($y = 0; $y -lt $logo.Height; $y++) {
        if ($logo.GetPixel($x, $y).A -gt 30) {
            if ($y -lt $arriba) { $arriba = $y }
            if ($y -gt $abajo) { $abajo = $y }
        }
    }
}
Write-Output "Simbolo detectado: x=$inicio..$fin, y=$arriba..$abajo"

$anchoIcono = $fin - $inicio + 1
$altoIcono = $abajo - $arriba + 1

# ------------------------------------------------------------
# 2. Componer favicon: baldosa navy con el simbolo centrado
# ------------------------------------------------------------
function Nueva-Baldosa([int]$tamano, [string]$salida) {
    $bmp = New-Object System.Drawing.Bitmap($tamano, $tamano, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear($navy)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.SmoothingMode = 'HighQuality'
    $g.PixelOffsetMode = 'HighQuality'

    # El simbolo ocupa ~62% de la baldosa, centrado
    $lado = [int]($tamano * 0.62)
    $escala = [Math]::Min($lado / $anchoIcono, $lado / $altoIcono)
    $w = [int]($anchoIcono * $escala)
    $h = [int]($altoIcono * $escala)
    $dx = [int](($tamano - $w) / 2)
    $dy = [int](($tamano - $h) / 2)

    $destino = New-Object System.Drawing.Rectangle($dx, $dy, $w, $h)
    $origen = New-Object System.Drawing.Rectangle($inicio, $arriba, $anchoIcono, $altoIcono)
    $g.DrawImage($logo, $destino, $origen, [System.Drawing.GraphicsUnit]::Pixel)
    $bmp.Save($salida, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose()
    Write-Output ("{0} ({1}x{1}, {2} KB)" -f (Split-Path $salida -Leaf), $tamano, [int]((Get-Item $salida).Length / 1KB))
}

Nueva-Baldosa 512 "$raiz\app\icon.png"
Nueva-Baldosa 180 "$raiz\app\apple-icon.png"
$logo.Dispose()

# ------------------------------------------------------------
# 3. Imagen Open Graph 1200x630: foto real de obra oscurecida
#    + logo combinado + barras diagonales tricolor
# ------------------------------------------------------------
$foto = [System.Drawing.Bitmap]::FromFile("$raiz\public\images\hero\slide1.jpg")
$og = New-Object System.Drawing.Bitmap(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($og)
$g.InterpolationMode = 'HighQualityBicubic'
$g.SmoothingMode = 'HighQuality'
$g.PixelOffsetMode = 'HighQuality'

# Recorte tipo object-cover: escala para cubrir 1200x630 y centra
$escala = [Math]::Max(1200 / $foto.Width, 630 / $foto.Height)
$w = [int]($foto.Width * $escala)
$h = [int]($foto.Height * $escala)
$g.DrawImage($foto, [int]((1200 - $w) / 2), [int]((630 - $h) / 2), $w, $h)

# Velo navy (75%) para que el logo resalte, como el overlay del hero
$velo = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 30, 35, 71))
$g.FillRectangle($velo, 0, 0, 1200, 630)

# Logo combinado centrado (~820px de ancho)
$logoCombinado = [System.Drawing.Bitmap]::FromFile("$logos\logo-combinado-blanco.png")
$anchoLogo = 820
$altoLogo = [int]($logoCombinado.Height * ($anchoLogo / $logoCombinado.Width))
$g.DrawImage($logoCombinado, [int]((1200 - $anchoLogo) / 2), [int]((630 - $altoLogo) / 2) - 30, $anchoLogo, $altoLogo)

# Barras diagonales tricolor bajo el logo (paralelogramos)
function Nuevo-Paralelogramo([int]$x, [int]$y, [int]$ancho, [int]$alto, [System.Drawing.Color]$color) {
    $inclinacion = [int]($alto * 0.45) # ~24 grados
    $puntos = @(
        (New-Object System.Drawing.Point(($x + $inclinacion), $y)),
        (New-Object System.Drawing.Point(($x + $ancho + $inclinacion), $y)),
        (New-Object System.Drawing.Point(($x + $ancho), ($y + $alto))),
        (New-Object System.Drawing.Point($x, ($y + $alto)))
    )
    $pincel = New-Object System.Drawing.SolidBrush($color)
    $g.FillPolygon($pincel, $puntos)
    $pincel.Dispose()
}

$naranja = [System.Drawing.Color]::FromArgb(255, 232, 70, 10)
$blanco = [System.Drawing.Color]::White
$verde = [System.Drawing.Color]::FromArgb(255, 58, 173, 46)
$yBarras = [int]((630 - $altoLogo) / 2) - 30 + $altoLogo + 55
$anchoBarra = 74; $altoBarra = 16; $separacion = 14
$xBarras = [int]((1200 - (3 * $anchoBarra + 2 * $separacion)) / 2)
Nuevo-Paralelogramo $xBarras $yBarras $anchoBarra $altoBarra $naranja
Nuevo-Paralelogramo ($xBarras + $anchoBarra + $separacion) $yBarras $anchoBarra $altoBarra $blanco
Nuevo-Paralelogramo ($xBarras + 2 * ($anchoBarra + $separacion)) $yBarras $anchoBarra $altoBarra $verde

# Guardar como JPG calidad 88
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
$og.Save("$raiz\public\images\og.jpg", $enc, $ep)
Write-Output ("og.jpg (1200x630, {0} KB)" -f [int]((Get-Item "$raiz\public\images\og.jpg").Length / 1KB))

$g.Dispose(); $og.Dispose(); $foto.Dispose(); $logoCombinado.Dispose(); $velo.Dispose()
