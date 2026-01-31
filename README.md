node 22

### Documentación importante:

1. custom Domain:  
   [Set up a custom domain in Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-external)

### TanStack Query con Persist Tool

La librería `@tanstack/react-query-persist-client` guarda el cache en localStorage con un tiempo máximo de validez (`maxAge`). Sin embargo, React Query tiene su propio **garbage collector** que elimina datos del cache en RAM basado en `gcTime`.

La libreria de persistencia es solo un apoyo el que sigue mandando es tanstanck query, el que decide si se volvera a llamar ala api real es tanstack query cuando staleTime vence. la libreria de persidt lo respalda en el tiempo staleTime para que durante este, si se cierra el navegador no realice ninguna llamada pero solo durante este tiempo staleTime.

Regla obligatoria:

```typescript
gcTime >= maxAge;
```

La documentación oficial dice:
_"gcTime debe ser ≥ maxAge, o el garbage collector eliminará los datos antes de que expire el localStorage."_
