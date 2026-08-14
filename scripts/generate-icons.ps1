Add-Type -AssemblyName System.Drawing

function New-StarIcon {
    param(
        [string]$Path,
        [int]$Size,
        [bool]$Maskable = $false
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.Clear([System.Drawing.Color]::FromArgb(255, 0x1A, 0x3D, 0x26))  # deep green background, fully opaque

    $cx = $Size / 2.0
    $cy = $Size / 2.0

    # Maskable icons need content within the ~80% "safe zone" circle; standard icons can use more of the canvas.
    if ($Maskable) {
        $outerR = $Size * 0.30
        $innerR = $Size * 0.13
    } else {
        $outerR = $Size * 0.40
        $innerR = $Size * 0.165
    }

    $points = New-Object System.Collections.Generic.List[System.Drawing.PointF]
    for ($i = 0; $i -lt 16; $i++) {
        $angle = (-90 + ($i * 22.5)) * [Math]::PI / 180.0
        if ($i % 2 -eq 0) { $r = $outerR } else { $r = $innerR }
        $x = $cx + $r * [Math]::Cos($angle)
        $y = $cy + $r * [Math]::Sin($angle)
        $points.Add((New-Object System.Drawing.PointF($x, $y)))
    }

    $gold = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 0xF5, 0xE6, 0xC8))
    $g.FillPolygon($gold, $points.ToArray())

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

New-StarIcon -Path "icons/icon-192.png" -Size 192 -Maskable $false
New-StarIcon -Path "icons/icon-512.png" -Size 512 -Maskable $false
New-StarIcon -Path "icons/icon-maskable-512.png" -Size 512 -Maskable $true
New-StarIcon -Path "icons/apple-touch-icon.png" -Size 180 -Maskable $true

Write-Host "Icons generated."
