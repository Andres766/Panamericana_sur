# ============================================================
# Script de un solo uso: redimensiona las imagenes del catalogo
# (Downloads\productos_panamericana) y las guarda en public/images
# con los nombres que usa el sitio. Requiere Windows PowerShell.
# ============================================================
Add-Type -AssemblyName System.Drawing

$src = "C:\Users\andse\Downloads\productos_panamericana"
$pub = "c:\Users\andse\Documents\panamericana_sur\public\images"

function Resize-Img([string]$entrada, [string]$salida, [int]$anchoMax, [long]$calidad) {
    $img = [System.Drawing.Image]::FromFile($entrada)
    $w = $img.Width; $h = $img.Height
    if ($w -gt $anchoMax) {
        $nw = $anchoMax
        $nh = [int][Math]::Round($h * ($anchoMax / $w))
    } else {
        $nw = $w; $nh = $h
    }
    $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.SmoothingMode = 'HighQuality'
    $g.PixelOffsetMode = 'HighQuality'
    $g.DrawImage($img, 0, 0, $nw, $nh)
    $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $calidad)
    $bmp.Save($salida, $enc, $ep)
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
    Write-Output ("{0} -> {1} ({2}x{3}, {4} KB)" -f (Split-Path $entrada -Leaf), (Split-Path $salida -Leaf), $nw, $nh, [int]((Get-Item $salida).Length / 1KB))
}

# --- Productos: renders del catalogo (max 900px de ancho) ---
$productos = @{
    '16' = 'teja-upvc-blanca-cresta-baja'
    '18' = 'teja-upvc-blanca-cresta-alta'
    '21' = 'teja-upvc-colonial'
    '23' = 'teja-policarbonato-cresta-alta'
    '25' = 'teja-policarbonato-cresta-baja'
    '27' = 'caballetes-cresta-baja'
    '28' = 'caballetes-cresta-alta'
    '29' = 'caballetes-coloniales'
    '30' = 'set-de-fijacion'
    '31' = 'alambre-de-amarre'
    '32' = 'perfiles-galvanizados'
    '33' = 'sellantes'
    '34' = 'cemento-cemex'
}
foreach ($k in $productos.Keys) {
    Resize-Img "$src\productos del catalogo-$k.jpg.jpeg" "$pub\productos\$($productos[$k]).jpg" 900 85
}
Resize-Img "$src\catalogo ferreteria panamericana-35.jpg.jpeg" "$pub\productos\sistema-de-canales.jpg" 900 85

# --- Galeria: fotos de obras reales (max 1400px) ---
$galeria = @{
    '17' = 'foto1'   # Colegio San Felipe Neri
    '19' = 'foto2'   # Parque Bolivar
    '20' = 'foto3'   # Plazoleta de comidas sector Morasurco
    '22' = 'foto4'   # Cubierta colonial - Colegio San Juan de Pasto
    '24' = 'foto5'   # Pergola policarbonato - Colegio San Juan de Pasto
    '26' = 'foto6'   # Descarga de contenedor (importacion directa)
}
foreach ($k in $galeria.Keys) {
    Resize-Img "$src\productos del catalogo-$k.jpg.jpeg" "$pub\galeria\$($galeria[$k]).jpg" 1400 82
}

# --- Hero: las mejores fotos de obra como fondo (max 1920px) ---
$hero = @{
    '17' = 'slide1'
    '24' = 'slide2'
    '22' = 'slide3'
    '19' = 'slide4'
    '26' = 'slide5'
}
foreach ($k in $hero.Keys) {
    Resize-Img "$src\productos del catalogo-$k.jpg.jpeg" "$pub\hero\$($hero[$k]).jpg" 1920 80
}
