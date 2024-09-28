# Gayou-Frontend

**Gayou-Frontend** is the front-end component of the `이대로 가유` project. This project is a web application that provides recommended travel routes based on public data. The front-end is built using Vite and integrates with Kakao's APIs for map services.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gayou-frontend.git
   cd gayou-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Environment Variables Setup

To configure the necessary environment variables for Kakao's API integration, follow these steps:

### 1. `.env` File for `.jsx` Files

The `VITE_KAKAO_API_KEY` is used within `.jsx` files, and it should be stored in an `.env` file in the project root.

```makefile
# .env
VITE_KAKAO_API_KEY=your_kakao_api_key
VITE_SPRINGBOOT_TARGET=your_springboot_target
VITE_FLASK_TARGET=your_flask_target
```

Ensure that you replace `your_kakao_api_key` with your actual Kakao API key.

### 2. System Environment Variable for `.html` Files

The `VITE_KAKAO_MAP_API_KEY` is used in the `.html` files and needs to be set as a system environment variable.

#### Linux / macOS:

```bash
export VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key
```

#### Windows:

```cmd
set VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key
```

Replace `your_kakao_map_api_key` with your actual Kakao Map API key.

### 3. Apply Changes

Once you've set the environment variables, restart your development environment to apply the changes.

## Usage

To start the development server, use:

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

or

```bash
yarn build
```

The build files will be generated in the `dist` folder.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
