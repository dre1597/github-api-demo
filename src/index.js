const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env["API_KEY"]
});

const prompt =  `
  Poderia me fornecer 3 modelos de respostas para este email:
`;

const context = `
  A camiseta escolhida tem o código 123, é do tamanho P, é azul e tem 10 unidades disponíveis em estoque.
`;

const email = `
  Bom dia,
  Pensei que a cor da camisa era amarela e era G, mas a camiseta escolhida foi azul.
  Att, Cliente.
`

async function main() {
  const {  data } = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `${prompt}, utilizando este contexto: "${context}" e este email: "${email}"`
        }
      ]
    }).withResponse();

  console.dir(data, {
    depth: 5
  });
}

main().catch((err) => {
  console.error(err);
});
