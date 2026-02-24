Write-Host "Converting absolute paths to relative paths (recursive)..."

Get-ChildItem -Path . -Recurse -File -Filter *.html | ForEach-Object {

    $file = $_.FullName
    $content = [System.IO.File]::ReadAllText($file)

    # Strip leading slash from internal asset paths
    $content = $content -replace 'href="/', 'href="'
    $content = $content -replace 'src="/', 'src="'
    $content = $content -replace 'url\("/', 'url("'

    [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)

    Write-Host ("OK: " + $_.FullName)
}

Write-Host "Done."
