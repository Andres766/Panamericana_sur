# ============================================================
# Recorta SOLO el símbolo de la marca (la "P" con la casita)
# del logo de Panamericana y lo guarda con fondo transparente
# como public/images/logos/simbolo.png. Se usa como marca de
# agua gigante en el fondo del hero. Script de un solo uso.
# ============================================================
Add-Type -AssemblyName System.Drawing

$logos = "c:\Users\andse\Documents\panamericana_sur\public\images\logos"
$origen = [System.Drawing.Bitmap]::FromFile("$logos\logo-panamericana-blanco.png") # contorno blanco para fondo oscuro

# Detectar el recuadro del primer glifo (el símbolo) escaneando el alfa
$maxX = [Math]::Min(400, $origen.Width - 1)
$columnaConContenido = @{}
for ($x = 0; $x -le $maxX; $x++) {
    $tiene = $false
    for ($y = 0; $y -lt $origen.Height; $y += 2) {
        if ($origen.GetPixel($x, $y).A -gt 30) { $tiene = $true; break }
    }
    $columnaConContenido[$x] = $tiene
}

$inicio = -1
foreach ($x in 0..$maxX) { if ($columnaConContenido[$x]) { $inicio = $x; break } }
$fin = -1; $vacias = 0
for ($x = $inicio; $x -le $maxX; $x++) {
    if (-not $columnaConContenido[$x]) { $vacias++ } else { $vacias = 0 }
    if ($vacias -ge 5) { $fin = $x - $vacias; break }
}
if ($fin -lt 0) { $fin = [Math]::Min($inicio + $origen.Height, $maxX) }

$arriba = $origen.Height; $abajo = 0
for ($x = $inicio; $x -le $fin; $x++) {
    for ($y = 0; $y -lt $origen.Height; $y++) {
        if ($origen.GetPixel($x, $y).A -gt 30) {
            if ($y -lt $arriba) { $arriba = $y }
            if ($y -gt $abajo) { $abajo = $y }
        }
    }
}

$w = $fin - $inicio + 1
$h = $abajo - $arriba + 1
Write-Output "Símbolo: x=$inicio..$fin ($w px), y=$arriba..$abajo ($h px)"

$recorte = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($recorte)
$destino = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$src = New-Object System.Drawing.Rectangle($inicio, $arriba, $w, $h)
$g.DrawImage($origen, $destino, $src, [System.Drawing.GraphicsUnit]::Pixel)
$recorte.Save("$logos\simbolo-blanco.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $recorte.Dispose(); $origen.Dispose()
Write-Output ("simbolo-blanco.png guardado ({0} KB)" -f [int]((Get-Item "$logos\simbolo-blanco.png").Length / 1KB))
