# 🚚 Shipment Tracker

A full-stack Shipment Tracker application built using **Next.js + TypeScript + Material UI** on the frontend, and **ASP.NET Core Web API + Entity Framework Core** on the backend. It follows a Clean Architecture approach for clear separation of concerns.

---

## Project Structure

```
ShipmentTracker/
├── API/               # ASP.NET Core Web API
├── Application/       # Application layer (services, interfaces)
├── Domain/            # Core business entities
├── Infrastructure/    # EF Core, DBContext, migrations
├── client/            # Next.js + React frontend
```

---

## Setup Instructions

### Backend Setup (`API/`)

1. Ensure [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) is installed.
2. Navigate to the backend root:

```bash
cd API
```

3. Apply migrations and run the API:

```bash
dotnet ef database update --project Infrastructure --startup-project API
dotnet run
```

> The API will be available at: `https://localhost:5001/api/shipments`

---

### Frontend Setup (`client/`)

1. Ensure [Node.js](https://nodejs.org/) (v18+) is installed.
2. Navigate to the frontend directory:

```bash
cd client
npm install
npm run dev
```

3. Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## Deployment Instructions

### Backend (ASP.NET Core)

You can deploy the backend using:

- Azure App Service
- IIS / Windows service

### Frontend (Next.js)

You can deploy using:

- [Vercel](https://vercel.com/) (recommended for Next.js)
- Netlify or any Node.js hosting service

#### Example environment variable (Vercel):
```
NEXT_PUBLIC_API_URL=https://your-api-url/api
```

---

## Design Choices

### Clean Architecture

- `Domain`: business entities (e.g., Shipment)
- `Application`: interfaces and services
- `Infrastructure`: database (SQLite) and persistence logic
- `API`: controllers and startup config

### Why These Tools?

| Tool | Why Used |
|------|----------|
| Next.js | SSR-ready frontend with flexible routing |
| Material UI | Rich UI components out of the box |
| Axios | Clean API calls with interceptors support |
| EF Core + SQLite | Lightweight and simple for local development |
| .NET Web API | Reliable backend framework with DI and middleware support |

### Patterns

- **Repository Pattern**
- **Dependency Injection**
- **DTOs and Interface Abstraction**

---

## Contact

For questions or contributions, please contact Gurwinder Singh.

---

![Shipment Tracker Screenshot](./Dashboard.jpg)
>>>>>>> 06e5c4f (Initial commit)
