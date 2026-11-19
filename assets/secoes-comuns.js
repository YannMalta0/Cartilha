/* =====================================================================
   SEÇÕES COMUNS — aparecem em TODOS os prédios.
   - Edite aqui uma vez e todos os prédios são atualizados.
   - "depoisDe": id da seção do prédio após a qual esta seção aparece.
     Se o prédio não tiver essa seção, ela vai para o final.
   - Se um prédio precisar de uma versão diferente, basta criar no
     index.html dele uma seção com o MESMO id: a do prédio substitui esta.
   ===================================================================== */
window.SECOES_COMUNS = [
  {
    id: "manutencao", icone: "🔧", titulo: "Abrir chamado de manutenção",
    depoisDe: "obras",
    itens: [
      "Notou algo danificado no prédio? Abra um chamado pelo botão abaixo.",
      "Dentro do horário comercial, retornaremos em até 2h.",
      "Caso precise de manutenção no seu apartamento, indicamos prestadores."
    ],
    aviso: "Não faça nem contrate reparos nas áreas comuns sem informar o síndico ou a administradora.",
       links: [{ texto: "Abrir chamado", url:" }]
  }
];
