import { FastifyInstance } from "fastify";
import { send } from "process";
import { StreamChat } from "stream-chat";

const streamChat = StreamChat.getInstance(
  process.env.STREAM_KEY!,
  process.env.STREAM_PRIVATE_KEY!
);

const TOKEN_USER_ID_MAP = new Map<string, string>();

export const userRoutes = async (app: FastifyInstance) => {
  app.post<{ Body: { id: string; name: string; image?: string } }>(
    "/signup",
    async (req, res) => {
      const { id, name, image } = req.body;
      if (id == null || name == null || id == "" || name == "") {
        return res.status(400).send();
      }

      const existingUser = await streamChat.queryUsers({ id });
      if (existingUser.users.length > 0)
        return res.status(400).send("user ID is taken");
      streamChat.upsertUser({ id, name, image });
    }
  );

  app.post<{ Body: { id: string } }>("/login", async (req, res) => {
    const { id } = req.body;
    if (id == null || id == "") {
      return res.status(400).send();
    }

    const {
      users: [user],
    } = await streamChat.queryUsers({ id });
    if (user === null) return res.status(401).send();
    const token = streamChat.createToken(id);
    TOKEN_USER_ID_MAP.set(token, user.id);
    return { token, user: { id: user.id, name: user.name, image: user.image } };
  });

  app.post<{ Body: { token: string } }>("/logout", async (req, res) => {
    const { token } = req.body;
    if (token == null || token === "") return res.status(400).send();
    const id = TOKEN_USER_ID_MAP.get(token);
    if (id == null) return res.status(400).send();
    await streamChat.revokeUserToken(id, new Date());
  });
};
