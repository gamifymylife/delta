Write-Host "Fixing paths and inserting base tags..."

$root = (Get-Location).Path

Get-ChildItem -Recurse -Filter *.html | ForEach-Object {

    $file = $_.FullName
    $relative = $file.Substring($root.Length).TrimStart('\')
    $base = $null

    if ($relative -eq "index.html") {
        $base = "./"
    }
    elseif ($relative -eq "projects\index.html") {
        $base = "../"
    }
    elseif ($relative -match "^projects\\[^\\]+\\index\.html$") {
        $base = "../../"
    }
    else {
        return
    }

    $content = Get-Content -Raw $file

    # Remove any existing <base ...> tags
    $content = $content -replace '<base[^>]*>', ''

    # Insert base tag right after <head>
    $content = $content -replace '<head>', "<head>`r`n    <base href=`"$base`">"

    # Strip leading slash from asset paths
    $content = $content -replace 'href="/', 'href="'
    $content = $content -replace 'src="/', 'src="'
    $content = $content -replace 'url\("/', 'url("'

    Set-Content -NoNewline -Encoding UTF8 $file $content

    Write-Host ("OK: fixed " + $relative + " base=" + $base)
}

Write-Host "Done."
