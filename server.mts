import express from "express";

const app = express();
const port = 3000;

app.use(express.json())

app.get('/test', (req, res) => {
  res.send(`
    <html>
      <body style="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: center; align-items: center">
        <div style="width: 500px; height: 300px; border: 1px solid black;" id="chat">
          <div id="fan">petr2008</div>
          <div class="message">message1</div>
          <div class="message">message2</div>
          <div class="message">message3</div>
          <div class="message">message4</div>
          <div id="field">
            <input id="msg-input" type="text" />
          </div>
        </div>
      </body>
    </html>
  
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
