<div align="center">
  <h1>SvelteKit + Supabase template</h1>
  <p>SvelteKit with Supabase email and password auth template<p>
  <p>From <a href="https://github.com/supabase/auth-helpers/tree/main/examples/sveltekit">https://github.com/supabase/auth-helpers/tree/main/examples/sveltekit</a></p>
  <a href="https://kit.svelte.dev/"><img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white"></a>
  <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white"></a>
</div>

## Set up the project and users
1. Create a new project on [Supabase](https://app.supabase.com/).
2. Enter the project details and wait for the database to launch.
3. Go to the [SQL Editor](https://app.supabase.com/project/_/sql) page in the dashboard.
4. Click **User Management Starter** under **Quick start**.
5. Click **Run**.
6. Go to the [URL configuration](https://app.supabase.com/project/_/auth/url-configuration) by selecting **Authentication** > **URL Configuration**.
7. Change the **Site URL** to `http://localhost:5173` and add `http://localhost:5173` to the **Redirect URLs**.

## Set up the database
1. Go to the [SQL Editor](https://app.supabase.com/project/_/sql) page in the [Supabase](https://app.supabase.com/) dashboard.
2. Click **Todo List** under **Quick start**.
3. Click **Run**.

## Create the repo
1. Clone the repo.
2. Make a copy of the `.env.example` file in the root directory and rename it `.env`.
3. Go to [Supabase](https://supabase.com/) and open the project.
4. Go to the [API Settings](https://app.supabase.com/project/_/settings/api) by selecting **Project Settings** > **API** to find the `project URL` and `anon API key`. Add them to the `.env` file.
```
NEXT_PUBLIC_SUPABASE_URL=project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon API key
```
5. Open a terminal and type `npm i` or `npm install` and press Enter.
6. Type `npm run dev` in the terminal and press Enter to start the server.
7. Open http://localhost:5173/ with your browser to see the result.
