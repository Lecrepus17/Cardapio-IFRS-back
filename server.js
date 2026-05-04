// ... seus outros imports ...
const authRoutes = require('./routes/auth.routes');
const menuRoutes = require('./routes/menu.routes'); // <-- Importe as rotas de menu

// ... configuração do express (app.use(express.json()), etc) ...

// Registro das rotas
app.use('/auth', authRoutes);
app.use('/menus', menuRoutes); // <-- Registre a rota no express

// ... resto do seu código (middlewares de erro, etc) ...