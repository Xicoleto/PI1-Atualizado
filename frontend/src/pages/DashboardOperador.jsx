import { useState, useEffect } from "react";
import { API_URL } from "../config";
 
function DashboardOperador({
  mudarPagina,
  altoContraste,       // NOVO: vem do componente pai (true = alto contraste ligado)
  alternarContraste,   // NOVO: função que liga/desliga o alto contraste
}) {
  const [lista, setLista] = useState([]);
 
  // NOVO: paleta de cores nos dois modos (mesmo padrão da página Acompanhar Solicitação)
  const cores = altoContraste
    ? {
        fundo: "#000000",
        cartao: "#000000",
        texto: "#FFFFFF",
        textoCabecalho: "#FFFF00",
        destaque: "#FFFF00",
        textoDestaque: "#000000",
        borda: "#FFFF00",
      }
    : {
        fundo: "#dcdcdc",
        cartao: "#FFFFFF",
        texto: "#1e293b",
        textoCabecalho: "#475569",
        destaque: "#1e3a8a",
        textoDestaque: "#FFFFFF",
        borda: "#e2e8f0",
      };
 
  // NOVO: a busca da lista virou uma função, para poder ser chamada de novo
  // depois de mudar um status (no lugar do window.location.reload)
  async function carregarLista() {
    try {
      const res = await fetch("${API_URL}/api/solicitacoes");
      const dados = await res.json();
      setLista(dados);
    } catch (error) {
      console.error("Erro ao carregar solicitações:", error);
    }
  }
 
  useEffect(() => {
    carregarLista();
  }, []);
 
  async function mudarStatus(id, novoStatus) {
    try {
      await fetch(`${API_URL}/api/solicitacoes/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_atual: novoStatus }),
      });
      // ANTES: window.location.reload();  (recarregar a página zerava o alto contraste)
      carregarLista();
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  }
 
  return (
    <div style={{ ...styles.container, backgroundColor: cores.fundo }}>
      <header
        style={{
          ...styles.header,
          backgroundColor: altoContraste ? "#000000" : "#1e3a8a",
          borderBottom: altoContraste ? "2px solid #FFFF00" : "none",
        }}
      >
        <div>Painel de Gestão Administrativa - Ituverava</div>
 
        {/* NOVO: botão de alto contraste */}
        <button
          type="button"
          onClick={alternarContraste}
          aria-pressed={altoContraste}
          style={{
            ...styles.contrastButton,
            backgroundColor: altoContraste ? "#FFFF00" : "#FFFFFF",
            color: altoContraste ? "#000000" : "#1e3a8a",
            border: "2px solid #FFFF00",
          }}
        >
          {altoContraste ? "Desativar alto contraste" : "Ativar alto contraste"}
        </button>
      </header>
 
      <main
        style={{
          ...styles.tableContainer,
          backgroundColor: cores.cartao,
          border: altoContraste ? "2px solid #FFFF00" : "none",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: altoContraste ? cores.destaque : "#1e3a8a" }}>
            Solicitações Recebidas
          </h2>
          <button
            style={{
              ...styles.btnSair,
              backgroundColor: altoContraste ? "#000000" : "#ef4444",
              border: altoContraste ? "2px solid #FFFFFF" : "none",
            }}
            onClick={() => mudarPagina("login")}
          >
            Sair
          </button>
        </div>
 
        <table style={styles.table}>
          <thead>
            <tr
              style={{
                ...styles.tableHead,
                backgroundColor: altoContraste ? "#000000" : "#f8fafc",
                borderBottom: `2px solid ${cores.borda}`,
              }}
            >
              <th style={{ ...styles.th, color: cores.textoCabecalho }}>Protocolo</th>
              <th style={{ ...styles.th, color: cores.textoCabecalho }}>CPF Solicitante</th>
              <th style={{ ...styles.th, color: cores.textoCabecalho }}>Local</th>
              <th style={{ ...styles.th, color: cores.textoCabecalho }}>Descrição</th>
              <th style={{ ...styles.th, color: cores.textoCabecalho }}>Data</th>
              <th style={{ ...styles.th, color: cores.textoCabecalho }}>Status</th>
              <th style={{ ...styles.th, color: cores.textoCabecalho }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((item) => {
              // cada célula usa a mesma cor de texto e borda, então guardo num objeto só
              const estiloTd = {
                ...styles.td,
                color: cores.texto,
                borderBottom: `1px solid ${altoContraste ? cores.borda : "#f1f5f9"}`,
              };
 
              return (
                <tr key={item.id} style={styles.tr}>
                  <td style={estiloTd}>{item.numero_protocolo}</td>
                  <td style={estiloTd}>{item.id_requerente}</td>
                  <td style={estiloTd}>{item.local_ocorrencia}</td>
                  <td style={estiloTd}>
                    <div style={styles.scrollText}>{item.descricao_ocorrencia}</div>
                  </td>
                  <td style={estiloTd}>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td style={estiloTd}>
                    <span style={getStatusStyle(item.status_atual, altoContraste)}>
                      {item.status_atual}
                    </span>
                  </td>
                  <td style={estiloTd}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        style={{
                          ...styles.btnAnalise,
                          ...(altoContraste && {
                            backgroundColor: "#FFFF00",
                            color: "#000000",
                            border: "2px solid #FFFF00",
                          }),
                        }}
                        onClick={() => mudarStatus(item.id, "Em análise")}
                      >
                        Analisar
                      </button>
                      <button
                        style={{
                          ...styles.btnConcluir,
                          ...(altoContraste && {
                            backgroundColor: "#000000",
                            color: "#FFFFFF",
                            border: "2px solid #FFFFFF",
                          }),
                        }}
                        onClick={() => mudarStatus(item.id, "Concluído")}
                      >
                        Concluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
 
// Função auxiliar para cores do status (agora recebe também o altoContraste)
const getStatusStyle = (status, altoContraste) => {
  // NOVO: no alto contraste não usamos cores suaves; usamos borda e texto fortes
  if (altoContraste) {
    const corAC = status === "Em análise" ? "#FFFF00" : "#FFFFFF";
    return {
      backgroundColor: "#000000",
      color: corAC,
      border: `2px solid ${corAC}`,
      padding: "4px 10px",
      borderRadius: "15px",
      fontSize: "12px",
      fontWeight: "bold",
    };
  }
 
  let color = "#666";
  if (status === "Em análise") color = "#f59e0b";
  if (status === "Concluído") color = "#10b981";
  return {
    backgroundColor: color + "20",
    color: color,
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "12px",
    fontWeight: "bold",
  };
};
 
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#dcdcdc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    padding: "15px",
    textAlign: "center",
    fontWeight: "bold",
    boxSizing: "border-box",
  },
  contrastButton: {
    marginTop: "12px",
    minHeight: "44px",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },
  tableContainer: {
    marginTop: "40px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "95%",
    maxWidth: "1100px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHead: {
    backgroundColor: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    color: "#475569",
    fontSize: "14px",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: "13px",
    color: "#1e293b",
  },
  scrollText: {
    maxWidth: "200px",
    maxHeight: "50px",
    overflowY: "auto",
    fontSize: "12px",
    lineHeight: "1.4",
  },
  btnAnalise: {
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "11px",
  },
  btnConcluir: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "11px",
  },
  btnSair: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
 
export default DashboardOperador;