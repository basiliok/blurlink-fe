# Práctica de testing — blurlink-fe

Guía para practicar **tests unitarios** y **tests de componentes** con **Vitest** en este proyecto.
Primero se hacen los unitarios (detallados en este documento) y después los de componentes.

## Alcance

| Tipo        | ¿Se practica? | Qué cubre                                                                                     |
| ----------- | ------------- | --------------------------------------------------------------------------------------------- |
| Unitario    | Sí (fase 1)   | Funciones puras, schemas de zod, stores de zustand, hooks propios, servicios con API mockeada |
| Componente  | Sí (fase 2)   | Un componente aislado: renderizarlo y simular la interacción del usuario                      |
| Integración | No            | Varias piezas juntas con el backend simulado (MSW)                                            |
| E2E         | No            | La app completa en un navegador real                                                          |

Quedan fuera de los unitarios:

- `src/api/hooks.ts` y `src/components/ChainCard/useChainLinkReorder.ts`: combinan React Query, router y stores, así
  que son tests de integración.
- `src/config/axios.ts`: los interceptores dependen de axios y de los stores a la vez.
- `src/constants/`, `src/types/` y `src/assets/`: no tienen lógica que probar.
- El hook `useToast` (en `src/stores/toast.store.ts`): es un atajo sin lógica (ver el paso 6).

**Regla para decidir qué testear:** un test unitario vale la pena cuando el código tiene lógica (condiciones, cálculos,
transformaciones, bordes) o cuando un error sería grave y silencioso.

## Stack

| Librería                                          | Cuándo se instala | Para qué                                                                                            |
| ------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| `vitest`                                          | Paso 0            | Ejecuta los tests. Trae `expect`, mocks (`vi.fn`, `vi.mock`, `vi.spyOn`), fake timers y snapshots   |
| `jsdom`                                           | Paso 5            | Simula `window`, `document` y `localStorage` dentro de Node                                         |
| `@testing-library/react` + `@testing-library/dom` | Paso 6            | `renderHook` para probar hooks. `@testing-library/dom` es una dependencia obligatoria de la primera |
| `mock-match-media`                                | Paso 6            | Simula `window.matchMedia` (jsdom no lo trae): evalúa media queries contra un ancho falso           |

La fase 2 (componentes) agregará `@testing-library/user-event` y `@testing-library/jest-dom`.

### Paso 0: setup

```bash
npm install -D vitest
```

En `package.json`:

```json
"scripts": {
    "test": "vitest",
    "test:run": "vitest run"
}
```

No hace falta un archivo de configuración aparte: Vitest lee el `vite.config.ts` que ya existe.

| Comando                                | Qué hace                                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `npm test`                             | Modo watch: vuelve a correr los tests cada vez que guardas. Es el que usas mientras practicas |
| `npm run test:run`                     | Corre todos los tests una sola vez (para CI o antes de commitear)                             |
| `npx vitest run src/utils/url.test.ts` | Corre un solo archivo                                                                         |

> Los tests viven dentro de `src`, así que `npm run build` (`tsc -b`) también revisa sus tipos: tienen que compilar sin
> errores, igual que el resto del código.

## Estructura y convenciones

### 1. El test vive al lado del archivo que prueba

```
src/utils/url.ts
src/utils/url.test.ts
```

**Por qué:** lo encuentras al instante, el import es corto (`./url`) y, si mueves o borras el archivo, el test se va con
él. Es la convención más común en proyectos Vite + React. La alternativa (carpetas `__tests__/`) separa el test del
código y obliga a escribir imports largos.

### 2. `describe` = qué se prueba, `it` = qué comportamiento

```ts
describe('getDisplayUrl', () => {
    it('removes the www prefix', () => { ... });
});
```

- `describe` lleva el nombre de la función, hook o store.
- `it` describe **un comportamiento**, en inglés como el resto del código, y se lee como una frase: _"it removes the www
  prefix"_.

**Por qué:** cuando un test falla, la consola muestra `getDisplayUrl > removes the www prefix` y sabes qué se rompió sin
abrir el archivo.

### 3. Patrón AAA: Arrange → Act → Assert

```ts
it('returns only the host when the URL has no path', () => {
    const url = 'https://github.com/'; // Arrange: preparar los datos

    const result = getDisplayUrl(url); // Act: ejecutar lo que se prueba

    expect(result).toBe('github.com'); // Assert: comprobar el resultado
});
```

Cada bloque va separado por una línea en blanco (los comentarios aquí son solo para la guía; en los tests no van). Cuando
el test cabe en una línea, por ejemplo `expect(getDisplayUrl(x)).toBe(y)`, el AAA queda implícito.

**Por qué:** todos los tests se leen igual: qué datos, qué acción y qué resultado.

### 4. Un comportamiento por test

Si un test comprueba tres cosas distintas y falla, no sabes cuál de las tres se rompió. Varios `expect` en un mismo test
están bien solo si comprueban **el mismo** comportamiento, por ejemplo `token` e `isAuthenticated` después de `setAuth`.

### 5. Tests independientes

Ningún test depende de lo que hizo otro. Todo lo que guarde estado (stores, mocks, timers, `localStorage`) se resetea
en `beforeEach` o `afterEach`.

**Por qué:** los tests tienen que pasar en cualquier orden y también por separado. Si no, aparecen fallos "fantasma"
que dependen del orden en que se ejecutaron.

### 6. Probar el comportamiento, no la implementación

Se prueba lo que entra y lo que sale (lo que ve quien usa la función), no cómo está hecha por dentro.

Ejemplo: en `linkRank.ts` no se comprueba que `rankAfter('a0')` devuelva exactamente `'a1'`, porque eso es un detalle
interno de la librería `fractional-indexing`. Se comprueba que el resultado **sea mayor** que `'a0'`.

**Por qué:** si mañana cambia la implementación pero el comportamiento sigue igual, los tests siguen pasando. Un test que
se rompe con cada refactor deja de ser útil.

### 7. Tablas de casos con `it.each`

Cuando varios casos tienen la misma forma (entrada → salida esperada):

```ts
it.each([
    ['https://github.com/', 'github.com'],
    ['https://www.github.com', 'github.com'],
])('displays %s as %s', (url, expected) => {
    expect(getDisplayUrl(url)).toBe(expected);
});
```

**Por qué:** evitas copiar y pegar el mismo test varias veces; agregar un caso nuevo es agregar una línea.

### 8. Imports explícitos desde `vitest`

```ts
import { describe, it, expect } from 'vitest';
```

**Por qué:** no hay que tocar `tsconfig` para declarar funciones globales y queda claro de dónde sale cada una.

### 9. Entorno: Node por defecto y jsdom solo donde haga falta

Los tests corren en Node, que es más rápido. Un archivo que necesite `window`, `localStorage` o renderizar hooks lo
declara en su **primera línea**:

```ts
// @vitest-environment jsdom
```

**Por qué:** las funciones puras no necesitan un navegador simulado, y así se ve de un vistazo qué tests dependen del DOM.

### 10. Flujo de trabajo de cada test (TDD)

TDD = **rojo → verde → refactor**: escribes un test que falla, haces que pase y después ordenas el código.

Como casi todo el código del proyecto **ya existe**, en cada test se trabaja así:

1. **Rojo:** escribe el test y hazlo fallar a propósito (pon un valor esperado incorrecto o rompe la función
   temporalmente). Confirma que el mensaje de error se entiende.
2. **Verde:** corrige el valor esperado (o restaura la función) y confirma que pasa.
3. **Refactor:** ordena el test (AAA, `it.each`, helpers) sin que deje de pasar.

**Por qué:** un test que nunca viste fallar puede no estar probando nada, por ejemplo si tiene un `expect` que nunca se
ejecuta.

Para **código nuevo** o para un **bug** (como el de `decodeJwt` en el paso 4) se hace TDD puro: primero el test que
falla y después el código que lo hace pasar.

---

## Primer test: `getDisplayUrl` (`src/utils/url.ts`)

### Qué hace la función

Convierte la URL completa de un link en un texto corto para mostrarlo en la tarjeta (`SimpleLinkCard`):

- Quita el protocolo y el prefijo `www.`.
- Si la URL no tiene path ni query, muestra solo el host.
- Si tiene path o query, muestra el host + `/` + la primera letra del path + `...`.
- Si no es una URL válida (por ejemplo, porque no tiene protocolo), la devuelve tal cual.

### Para qué sirve este test

- **Protege lo que ve el usuario:** si alguien cambia la función y la URL deja de mostrarse como se espera, el test falla
  antes de que el cambio llegue a producción.
- **Documenta el comportamiento con ejemplos:** con leer la tabla de casos entiendes la función sin abrir su código.
- **Es el mejor punto de partida:** es una función pura (entrada → salida), sin DOM, sin estado y sin mocks. Solo
  necesitas `describe`, `it`, `expect` y `toBe`.

### Casos

| Entrada                         | Salida esperada    | Comportamiento                                                    |
| ------------------------------- | ------------------ | ----------------------------------------------------------------- |
| `https://github.com/`           | `github.com`       | Sin path → solo el host                                           |
| `https://www.github.com`        | `github.com`       | Quita `www.`                                                      |
| `https://docs.github.com/`      | `docs.github.com`  | Solo quita `www.`, no otros subdominios                           |
| `https://github.com/kevin/repo` | `github.com/k...`  | Con path → host + primera letra + `...`                           |
| `https://google.com?q=test`     | `google.com/...`   | Una query cuenta como path, pero no hay ninguna letra que mostrar |
| `github.com/kevin`              | `github.com/kevin` | Sin protocolo no es una URL válida → se devuelve igual            |
| `not a url`                     | `not a url`        | Texto inválido → se devuelve igual                                |

> El caso `google.com?q=test` documenta el comportamiento **actual**. Si crees que debería mostrarse distinto, eso es un
> cambio de la función, no del test: primero se decide y después se cambian los dos.

### Código (`src/utils/url.test.ts`)

```ts
import { describe, it, expect } from 'vitest';
import { getDisplayUrl } from './url';

describe('getDisplayUrl', () => {
    it('returns only the host when the URL has no path', () => {
        expect(getDisplayUrl('https://github.com/')).toBe('github.com');
    });

    it('removes the www prefix', () => {
        expect(getDisplayUrl('https://www.github.com')).toBe('github.com');
    });

    it('keeps subdomains other than www', () => {
        expect(getDisplayUrl('https://docs.github.com/')).toBe('docs.github.com');
    });

    it('shortens the path to its first character', () => {
        expect(getDisplayUrl('https://github.com/kevin/repo')).toBe('github.com/k...');
    });

    it('treats a query string as a path', () => {
        expect(getDisplayUrl('https://google.com?q=test')).toBe('google.com/...');
    });

    it.each(['github.com/kevin', 'not a url'])('returns "%s" unchanged when it is not a valid URL', (input) => {
        expect(getDisplayUrl(input)).toBe(input);
    });
});
```

---

## Guía de tests unitarios

El orden está pensado para que cada paso agregue **uno o dos conceptos nuevos** sobre lo que ya aprendiste en el
anterior.

| Paso | Archivo             | Conceptos nuevos                                                      | Entorno      |
| ---- | ------------------- | --------------------------------------------------------------------- | ------------ |
| 1    | `utils/url.ts`      | `describe`, `it`, `expect`, `toBe`, AAA, `it.each`                    | Node         |
| 2    | `utils/linkRank.ts` | `toEqual` vs `toBe`, `toHaveLength`, probar relaciones, inmutabilidad | Node         |
| 3    | Schemas de zod      | `safeParse`, comprobar mensajes de error, `result.data`               | Node         |
| 4    | `utils/jwt.ts`      | Helpers para datos de prueba, `toThrow`, TDD sobre un bug             | Node         |
| 5    | Stores de zustand   | `beforeEach`, `vi.spyOn`, `toMatchObject`, `localStorage`             | Node / jsdom |
| 6    | Hooks propios       | `renderHook`, `act`, fake timers, `vi.stubGlobal`, valores límite     | jsdom        |
| 7    | `api/services.ts`   | `vi.mock`, `vi.mocked`, `mockResolvedValue`, tests async              | Node         |

### Paso 1: `src/utils/url.ts`

Es el [primer test](#primer-test-getdisplayurl-srcutilsurlts) descrito arriba.

### Paso 2: `src/utils/linkRank.ts`

Funciones que calculan el `rank` (la posición) de los links y los ordenan.

| Función         | Casos                                                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rankAfter`     | Con `null` devuelve un rank; con un rank devuelve uno **mayor**                                                                                                                                                               |
| `rankBefore`    | Devuelve un rank **menor** que el que recibe                                                                                                                                                                                  |
| `rankBetween`   | Devuelve un rank **entre** los dos que recibe                                                                                                                                                                                 |
| `rankBulkAfter` | Devuelve `count` ranks, todos mayores que el que recibe y en orden ascendente                                                                                                                                                 |
| `sortByRank`    | Ordena por `rank` · con el mismo `rank` desempata por `createdAt` · con el mismo `rank` y `createdAt`, por `id` · si falta `createdAt`, desempata por `id` · **no modifica** el array original · un array vacío devuelve `[]` |

Cómo:

- Compara los ranks con `<` y `>` (`expect(rankAfter(a) > a).toBe(true)`), no con valores exactos (convención 6).
- Para comparar arrays u objetos usa `toEqual`, que compara el contenido. `toBe` compara la referencia, es decir, si es
  el mismo objeto en memoria.
- Inmutabilidad: guarda una copia del array original, llama a `sortByRank` y comprueba que el original sigue igual
  (`toEqual`) y que el resultado es otro array (`not.toBe`).
- Crea los items con un helper pequeño: `const item = (id: string, rank: string, createdAt?: string) => ({ id, rank, createdAt })`.

### Paso 3: schemas de zod

| Schema                     | Archivo                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `createChainFormSchema`    | `components/CreateChainModal/CreateChainModal.schema.ts`         |
| `editChainFormSchema`      | `components/EditChainModal/EditChainModal.schema.ts`             |
| `bulkSimpleLinkItemSchema` | `components/ChainCard/CreateLinkModal/CreateLinkModal.schema.ts` |

Casos:

- **`chainName`** (create y edit): `''` falla con `Name is required` · `'   '` también falla, porque el `trim` lo deja
  vacío · `' Work '` pasa y el dato queda como `'Work'`.
- **`bulkSimpleLinkItemSchema`**:
    - `url` válidas: `https://…`, `http://…`, `mailto:…`.
    - `url` inválidas, con el mensaje `Invalid URL format`: `javascript:alert(1)`, `JAVASCRIPT:alert(1)` (en
      mayúsculas), `data:text/html,hi` y `github.com` (sin protocolo).
    - `name` vacío falla con `Name is required`.

Cómo:

- Usa `safeParse`, que no lanza errores sino que devuelve `{ success, data }` o `{ success, error }`:
    - Si el caso debe fallar, comprueba el mensaje: `expect(result.error?.issues[0].message).toBe('Name is required')`.
      Si el schema pasara, `error` sería `undefined` y el test fallaría igual.
    - Si el caso debe pasar: `expect(result.success).toBe(true)`, o `expect(result.data).toEqual(...)` cuando importa
      el dato transformado (por ejemplo, el `trim`).
- Cada schema tiene su propio archivo de test al lado (convención 1), aunque create y edit tengan los mismos casos. En
  los tests se prefiere que cada archivo se entienda solo, aunque se repita algo de código: si mañana cambia el schema
  de edit, cambias su test sin tocar el de create.

### Paso 4: `src/utils/jwt.ts`

`decodeJwt` lee el payload del token (la parte del medio) y devuelve `{ userId, email }`.

Casos:

- Devuelve `userId` y `email` del payload.
- Ignora los demás campos del payload (`iss`, `iat`, `exp`): el resultado es **exactamente** `{ userId, email }`, así
  que se comprueba con `toEqual`.
- Un token mal formado (`'abc'`, `'a.%%%.c'`) lanza un error.
- **Payload en base64url:** los JWT codifican el payload en base64url, que usa `-` y `_` en lugar de `+` y `/`.
  `decodeJwt` usaba `atob`, que solo entiende base64 estándar, así que un payload que generara esos caracteres lanzaba
  `InvalidCharacterError`. Con texto ASCII solo pasa si el JSON tiene `>`, `?` o `~` en ciertas posiciones (o
  caracteres no ASCII), por eso es raro, pero un email válido como `k~ev?indev@example.com` lo dispara. Se corrigió con
  **TDD puro**: primero el test (rojo) y después la conversión de `-` → `+` y `_` → `/` antes de `atob` (verde).

Cómo:

- Helper para generar tokens dentro del test:

    ```ts
    const createToken = (payload: object) =>
        `header.${Buffer.from(JSON.stringify(payload)).toString('base64url')}.signature`;
    ```

    **Por qué un helper:** el test muestra el dato importante (el payload) y esconde el detalle de cómo se codifica.

- `toThrow` recibe una **función**: `expect(() => decodeJwt('abc')).toThrow()`. Si llamas a `decodeJwt('abc')`
  directamente, el error rompe el test antes de llegar al `expect`.

### Paso 5: stores de zustand

Los stores se prueban **sin React**: `getState()` devuelve el estado y las acciones, y `setState()` permite prepararlo o
resetearlo.

**`stores/toast.store.ts` (Node)**

- Empieza con `toastList` vacío.
- `addToast` agrega un toast con `id`, `message` y `variant`.
- `addToast` sin variant deja `variant` como `undefined`.
- Varios `addToast` seguidos mantienen el orden.
- `removeToast` quita solo el toast con ese `id`.
- `removeToast` con un `id` que no existe no cambia la lista.

**`stores/auth.store.ts` y `stores/user.store.ts` (jsdom)**

Usan `persist`, que guarda el estado en `localStorage`, y Node no tiene `localStorage`. Instala jsdom antes:
`npm install -D jsdom`.

- Estado inicial: `token: null` e `isAuthenticated: false` / `userId: null` y `email: null`.
- `setAuth` guarda el token y marca `isAuthenticated: true`; `clearAuth` vuelve al estado inicial.
- `setUser` y `clearUser` funcionan igual.
- Persisten en `localStorage` con las claves `auth-storage` y `user-storage`. Lo que se guarda tiene la forma
  `{"state":{...},"version":0}`.

Cómo:

- En `beforeEach`: `useToastStore.setState(useToastStore.getInitialState())`, que vuelve al estado inicial definido en
  el `create` (en los stores con `persist`, sin lo cargado de `localStorage`), y `localStorage.clear()` en los que
  persisten. **Por qué:** cada store es un singleton, una sola instancia compartida por todos los tests del archivo. Sin
  resetear, el estado de un test se filtra al siguiente. Para comprobarlo, `npx vitest run src/stores --sequence.shuffle`
  corre los tests en orden aleatorio.
- Para probar una acción sola, prepara el estado con `setState` en lugar de usar otra acción: el test de `removeToast`
  arma la lista con `setState`, así no falla si se rompe `addToast`.
- El estado incluye las acciones (funciones), así que se compara con `toMatchObject`, que solo mira las propiedades que
  le pasas: `expect(useAuthStore.getState()).toMatchObject({ token: null, isAuthenticated: false })`.
- `crypto.randomUUID` genera un id distinto en cada ejecución. Para comparar el toast completo, fíjalo con
  `vi.spyOn(crypto, 'randomUUID').mockReturnValue('00000000-0000-0000-0000-000000000001')` y restáuralo con
  `vi.restoreAllMocks()` en `afterEach`.
- Para leer lo guardado: `const readStorage = (key: string): unknown => JSON.parse(localStorage.getItem(key) ?? 'null')`.
  Si la clave no existe devuelve `null` y el test falla con un mensaje claro.

### Paso 6: hooks propios (jsdom)

Instala: `npm install -D @testing-library/react @testing-library/dom mock-match-media`

Un hook solo funciona dentro de un componente; `renderHook` crea uno invisible para poder probarlo. El valor actual
queda en `result.current`.

**`hooks/useCountdown.ts`**

- Devuelve el valor inicial.
- Baja 1 por cada segundo.
- Llega a 0 y **no baja de 0** aunque pase más tiempo.
- Con `0` como valor inicial se queda en 0.
- Si se desmonta mientras cuenta, no deja timers activos: `vi.getTimerCount()` es `1` antes de `unmount()` (para
  confirmar que había un timer) y `0` después.

Los dos casos del 0 son los **valores límite** del hook: el borde donde el contador se tiene que detener.

Cómo:

- `vi.useFakeTimers()` en `beforeEach` y `vi.useRealTimers()` en `afterEach`. **Por qué:** el test no espera segundos
  reales; `vi.advanceTimersByTime(1000)` adelanta el reloj al instante.
- El avance del reloj va dentro de `act(() => ...)`, porque cambia el estado de React y hay que dejar que React vuelva a
  renderizar.
- **Avanza de a un segundo por cada `act`** (un helper `tick(n)` que repite `act(() => vi.advanceTimersByTime(1000))`).
  Si adelantas 10 segundos en un solo `act`, el intervalo se ejecuta 10 veces antes de que React vuelva a renderizar y
  el contador termina en `-5`, algo que en el navegador no pasa.

**`useToast` (en `stores/toast.store.ts`): no se testea**

Es un atajo sin lógica: cada método solo llama a `addToast` con una variante fija, así que un test unitario repetiría la
implementación. Además, como `renderHook` necesita un `document`, obligaría a correr todo `toast.store.test.ts` en jsdom
(unos 730 ms, frente a unos 130 ms en Node). Se aplica la regla del principio: sin lógica y sin riesgo de un error grave y
silencioso, no hace falta un test unitario.

**`hooks/useDevice.ts` (el más avanzado)**

- Devuelve `desktop`, `tablet` o `mobile` según el ancho de la pantalla (1024, 600 y 400 px).
- Se actualiza cuando la pantalla cambia de tamaño.
- Al desmontarse deja de escuchar los cambios de pantalla.

Cómo:

- jsdom **no implementa** `window.matchMedia`. La librería `mock-match-media` trae uno falso pero completo: evalúa las
  media queries de verdad (incluido `rem`) contra el ancho que fija el test con `setMedia({ width })`, y dispara el
  evento `change` cuando ese ancho cruza un límite.
- Se instala con `vi.stubGlobal('matchMedia', matchMedia)` en `beforeEach`. En `afterEach`, `cleanup()` borra el ancho y
  los listeners que guardó la librería, y `vi.unstubAllGlobals()` quita el `matchMedia` falso.
- Un helper `setScreenWidth(width)` cambia el ancho. Si el hook ya está montado, va dentro de `act`, porque cambia el
  estado de React.
- Para el desmontaje: después del `unmount()` se espía `window.matchMedia` y se cambia el ancho de 400 a 1024 px, que
  cruza los dos límites. Si quedara algún listener, el hook volvería a preguntar el tamaño, así que se espera
  `not.toHaveBeenCalled()`. Este test también pasaría si el hook nunca se hubiera suscrito, pero ese caso lo atrapa el
  test de actualización.

**Por qué una librería:** un mock escrito a mano solo imita lo que el hook usa hoy. El que había describía la pantalla
con listas de queries en vez de anchos, no detectaba un listener quitado de la lista equivocada y fallaba ante un cambio
válido del hook. `mock-match-media` se comporta como el navegador, así que el test queda más legible y más estricto.

### Paso 7: `src/api/services.ts` (mocks de módulos)

Cada función llama a `api.get`, `api.post`, `api.patch` o `api.delete` y devuelve `data.result`. El test **no hace
peticiones reales**: reemplaza el módulo `config/axios` por uno falso.

Casos (para cada función):

- Llama al método y al endpoint correctos, con el body correcto. Por ejemplo, `login` → `api.post('/sign-in', credentials)`,
  `getChainsBySpaceId('s1')` → `api.get('/space/s1/chain')` y `deleteChain` → `api.delete('/chain/c1', { data: body })`.
- Devuelve el `data.result` de la respuesta.
- Si la petición falla, la función propaga el error: `await expect(login(credentials)).rejects.toThrow()`.

Cómo:

```ts
vi.mock('../config/axios', () => ({
    api: { get: vi.fn(), post: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));
```

- `vi.mocked(api.post).mockResolvedValue({ data: { result } } as AxiosResponse)` define qué "responde" el backend falso.
  El `as AxiosResponse` hace falta porque el objeto falso no tiene todos los campos de una respuesta real de axios.
- `expect(api.post).toHaveBeenCalledWith('/sign-in', credentials)` comprueba con qué se hizo la llamada.
- `vi.clearAllMocks()` en `beforeEach`, para que las llamadas de un test no cuenten en el siguiente.

**Por qué mockear:** un test unitario prueba **solo** la función. Si usara el backend real, sería lento y podría fallar
por razones que no tienen que ver con el código (la red, los datos, un servidor caído). Esto es lo que las ofertas de
trabajo llaman "uso de mocks".

---

## Progreso

- [x] Paso 0: instalar Vitest y agregar los scripts
- [x] Paso 1: `utils/url.ts`
- [x] Paso 2: `utils/linkRank.ts`
- [x] Paso 3: schemas de zod
- [x] Paso 4: `utils/jwt.ts` (incluido el caso base64url con TDD)
- [x] Paso 5: `toast.store`, `auth.store` y `user.store`
- [x] Paso 6: `useCountdown` y `useDevice`
- [ ] Paso 7: `api/services.ts`

## Después: fase 2 (tests de componentes)

Cuando terminen los unitarios: se instalan `@testing-library/user-event` y `@testing-library/jest-dom`, se renderizan
componentes con `render`, se buscan elementos como los ve el usuario (`screen.getByRole`, `screen.getByText`), se
simula la interacción con `userEvent` y se prueban snapshots con `toMatchSnapshot()`. Tendrá su propia guía en este
documento.
