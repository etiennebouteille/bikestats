<div class="mx-auto max-w-screen-xl px-2 py-16 m:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
      <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        En selle.
      </h1>
  
      <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
        Partout, tout le temps, et par tous les temps?
      </p>
  
      <form method="POST" action="?/register" class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl bg-gray-50">
        <p class="text-lg font-medium">Créer un compte sur Flytta 🚴</p>
  
        <div>
          <label for="email" class="text-sm font-medium">Nom d'utilisateur</label>
  
          <div class="relative mt-1">
            <input
              type="username"
              name="username"
              id="email"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Nom d'utilisateur"
            />
  
            <span class="absolute inset-y-0 right-4 inline-flex items-center">
              <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-gray-400"
              stroke="currentColor" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path stroke-width="2" d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"/></svg>
            </span>
          </div>
        </div>
  
        <div>
          <label for="password" class="text-sm font-medium">Mot de passe</label>
  
          <div class="relative mt-1">
            <input
              type="password"
              name="password"
              id="password"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Mot de passe"
            />
  
            <span class="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <button
          type="submit"
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Créer mon compte
        </button>
  
        <p class="text-center text-sm text-gray-500">
          Déjà un compte?
          <a class="underline" href="/login">Connection</a>
        </p>
      </form>
    </div>
  </div>
  