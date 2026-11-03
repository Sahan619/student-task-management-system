# student-task-management-system

## Run with Docker Compose

The Compose stack does not rely on `server/.env`. Supply the database root
password and JWT signing secret in the current terminal before starting it.
Use values from your secret manager and keep the database password consistent
with the existing `mysql_data` volume; changing that environment value alone
does not rotate the password stored in MySQL.

PowerShell:

```powershell
$env:MYSQL_ROOT_PASSWORD = "<your database password>"
$env:JWT_SECRET = "<your long random JWT signing secret>"
docker compose up --build
```

Ubuntu:

```sh
export MYSQL_ROOT_PASSWORD='<your database password>'
export JWT_SECRET='<your long random JWT signing secret>'
docker compose up --build
```

Open the frontend at `http://localhost:5173` on the Docker host. If opening it
from another computer, use the Docker host's address and port `5173`. The Vite
development server proxies `/api` requests to the backend service, so browser
requests do not incorrectly target the browser computer's `localhost`. The
proxy defaults to `http://localhost:5000` for a locally running backend and
Compose sets it to `http://backend:5000` inside Docker.

The MySQL initialization script defines `users` with `id`, `name`, `email`,
`password`, and `created_at`; these columns match the authentication queries.
It is applied only when MySQL initializes a new data directory. Compose keeps
the existing named volume and does not erase existing database data.

## Run checks

```sh
npm --prefix client run lint
npm --prefix client run build
npm --prefix server test
```