import { createProduct, getProducts, deleteProduct } from './actions/products';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="page">
      <header className="header">
        <div>
          <h1>Controle de Estoque</h1>
          <p>Painel de gerenciamento de produtos</p>
        </div>
      </header>

      <section className="panel">
        <h2>Novo Produto</h2>

        <form action={createProduct} className="form">
          <input name="name" placeholder="Nome do produto" required />
          <input name="type" placeholder="Categoria / Tipo" />
          <input name="description" placeholder="Descrição" />
          <input name="quantity" type="number" placeholder="Quantidade" required />
          <button type="submit">Cadastrar Produto</button>
        </form>
      </section>

      <section className="list">
        <h2>Produtos em Estoque</h2>

        <div className="grid">
          {products.map((p: any) => (
            <div key={p.id} className="card">
              <div className="info">
                <strong>{p.name}</strong>
                {p.type && <span>{p.type}</span>}
                {p.description && <p>{p.description}</p>}
              </div>

              <div className="bottom">
                <span>Qtd: {p.quantity}</span>
                <form
                  action={async () => {
                    'use server';
                    await deleteProduct(p.id);
                  }}
                >
                  <button className="delete">Excluir</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        * { box-sizing: border-box; }

        .page {
          min-height: 100vh;
          background: #010411;
          color: #e5e7eb;
          padding: 40px 24px;
          font-family: system-ui, -apple-system, Segoe UI, sans-serif;
        }

        .header {
          max-width: 1200px;
          margin: 0 auto 40px;
        }

        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }

        .header p {
          margin: 4px 0 0;
          color: #94a3b8;
          font-size: 14px;
        }

        .panel {
          max-width: 1200px;
          margin: 0 auto 50px;
          background: #020617;
          border: 1px solid #1e293b;
          border-radius: 14px;
          padding: 24px;
        }

        .panel h2 {
          margin: 0 0 16px;
          font-size: 18px;
        }

        .form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }

        input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #1e293b;
          background: #020617;
          color: white;
          font-size: 14px;
        }

        input::placeholder { color: #64748b; }

        button {
          background: #0bbe74;
          border: none;
          border-radius: 20px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        button:hover { background: #1d4ed8; }

        .list {
          max-width: 1200px;
          margin: auto;
        }

        .list h2 {
          font-size: 18px;
          margin-bottom: 16px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }

        .card {
          background: #020617;
          border: 1px solid #1e293b;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: .15s ease;
        }

        .card:hover {
          border-color: #334155;
          transform: translateY(-2px);
        }

        .info strong {
          font-size: 15px;
        }

        .info span {
          display: block;
          font-size: 12px;
          color: #60a5fa;
          margin-top: 2px;
        }

        .info p {
          font-size: 13px;
          color: #cbd5f5;
          margin: 6px 0 0;
        }

        .bottom {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .delete {
          background: transparent;
          border: 1px solid #7f1d1d;
          color: #f87171;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .delete:hover {
          background: #7f1d1d;
        }
      `}</style>
    </main>
  );
}
