import app from '@/server';
import { env } from '@/env.mjs';
const port = env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});
