# Project Setup and Usage

## Prerequisites
- Node.js (>= 22.x)
- pnpm (>= 10.x)

## Install Dependencies
```sh
pnpm install
```

## Configure the Database
1. Create a `.env` file in the root directory
2. Add your configuration to the `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

## Usage

### Start the Dev Server
```sh
pnpm run dev
```

### Build for Production
```sh
pnpm run build
```
### Start the Production Server
```sh
pnpm run start
```
## Technologies Used
- TypeScript: For static type checking
- React: For building user interfaces
- Vite: For development and build tooling
- Shadcn: For UI components
- React Router: For routing
- Tailwind CSS: For styling
## License
This project is licensed under the MIT License.
