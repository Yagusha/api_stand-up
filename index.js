import { log } from "node:console";
import http from "node:http"; //модуль сервера для запросов
import fs from "node:fs/promises"; //модуль который позволяет читать файлы с сервера

const PORT = 8080;

const data = await fs.readFile("package.json", "utf-8");
console.log("data: ", data);

//метод создает сервер createServer() и
//запускает сервер на прослушку порт 8080 listen(8080)
http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === '/comedians'){
        try { //блок кода, в котором может произойти исключение
            const data = await fs.readFile("comedians.json", "utf-8");
            res.writeHead(200, {
                "Content-Type": "text/json; charset=utf-8",
                "Access-Control-Allow-Origin": "*",
            });
            res.end(data);
        } catch (error) { //обработка исключения
            res.writeHead(500,{
                "Content-Type": "text/plain; charset=utf-8",
            });
            res.end(`Ошибка сервера: ${error}`)
        }        
    } else {
        res.writeHead(404, {
            "Content-Type": "text/plain; charset=utf-8",
        });
        res.end("not found");
    } 
})
.listen(PORT);

console.log(`сервер запущен на http://localhost:${PORT}`);