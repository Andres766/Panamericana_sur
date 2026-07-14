# Reprocesa los dos slides verticales del hero limitando la ALTURA
# a 1440px para que no pesen tanto (el hero los recorta con object-cover).
Add-Type -AssemblyName System.Drawing

$src = "C:\Users\andse\Downloads\productos_panamericana"
$pub = "c:\Users\andse\Documents\panamericana_sur\public\images"

function Resize-PorAltura([string]$entrada, [string]$salida, [int]$altoMax, [long]$calidad) {
    $img = [System.Drawing.Image]::FromFile($entrada)
    $w = $img.Width; $h = $img.Height
    if ($h -gt $altoMax) {
        $nh = $altoMax
        $nw = [int][Math]::Round($w * ($altoMax / $h))
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

Resize-PorAltura "$src\productos del catalogo-19.jpg.jpeg" "$pub\hero\slide4.jpg" 1440 80
Resize-PorAltura "$src\productos del catalogo-26.jpg.jpeg" "$pub\hero\slide5.jpg" 1440 80
Resize-PorAltura "$src\productos del catalogo-20.jpg.jpeg" "$pub\galeria\foto3.jpg" 1440 82
Resize-PorAltura "$src\productos del catalogo-19.jpg.jpeg" "$pub\galeria\foto2.jpg" 1440 82
Resize-PorAltura "$src\productos del catalogo-26.jpg.jpeg" "$pub\galeria\foto6.jpg" 1440 82
