# Correção do lint da galeria

Substitui os dois arquivos incluídos e execute:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run lint
npm run build
```
