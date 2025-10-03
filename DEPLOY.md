# Deploy Instructions for Vercel

## ⚠️ IMPORTANTE: Configuração das Variáveis de Ambiente

O erro `VITE_API_URL: undefined` indica que a variável de ambiente não está configurada no Vercel.

### Passo a passo para configurar no Vercel:

1. **Acesse o projeto no painel do Vercel**
2. **Vá em Settings → Environment Variables**
3. **Adicione a variável:**
   - **Name**: `VITE_API_URL`
   - **Value**: `https://iftm-izoo-pie4-backend.onrender.com`
   - **Environments**: Marque **Production**, **Preview** e **Development**

4. **IMPORTANTE**: Após adicionar a variável, você DEVE fazer um **Redeploy**:
   - Vá na aba **Deployments**
   - Clique nos três pontos (...) do último deploy
   - Selecione **Redeploy**

### Como verificar se funcionou:

1. Abra o console do navegador (F12) na aplicação
2. Procure pelos logs:
   - `VITE_API_URL from env: https://iftm-izoo-pie4-backend.onrender.com` ✅
   - `Using API_URL: https://iftm-izoo-pie4-backend.onrender.com` ✅

### Se ainda não funcionar:

1. **Limpe o cache do Vercel**: Vá em Settings → Functions → Clear Cache
2. **Force um novo deploy**: Delete o último deployment e faça push de um novo commit
3. **Verifique o build log**: Procure por erros relacionados às variáveis de ambiente

## Fallback implementado

O código agora tem um fallback automático para a URL da API, então mesmo que a variável não esteja configurada, ainda tentará usar a URL correta:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://iftm-izoo-pie4-backend.onrender.com';
```

## Troubleshooting

### Problemas comuns:
1. **404 Not Found**: Variável de ambiente não configurada
2. **CORS Error**: Backend não está aceitando requisições do domínio
3. **Network Error**: Backend está offline ou inacessível

### Debug logs adicionados:
- Logs detalhados no console do navegador
- Verificação da URL da API sendo usada
- Status das requisições HTTP