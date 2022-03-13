const express = require('express');
const app = express();
 
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

app.get('/produtos', (req, res) => {
    res.send(lista_produtos.produtos);
});

app.get('/produtos/:id', (req, res) => {
    const filtered = lista_produtos.produtos.find((i) => i.id == parseInt(req.params.id));
    res.send(filtered);
});

app.post('/produtos', function(req, res) {
    lista_produtos.produtos.push(req.body)
    res.status(204).end();
});

app.delete('/produtos/:id', function(req, res) {
    const indexToDelete = lista_produtos
        .produtos
        .findIndex(prod => prod.id == parseInt(req.params.id))

    console.log(indexToDelete)
    if(indexToDelete !== -1) {
        lista_produtos.produtos.splice(indexToDelete, 1);
    }

    res.status(200).end();
});

app.put('/produtos/:id', function(req, res) {
    const index = lista_produtos
        .produtos
        .findIndex(prod => prod.id == parseInt(req.params.id))

    if(index !== -1) {
        lista_produtos.produtos[index] = req.body;
    }
    res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});