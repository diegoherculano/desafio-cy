describe("Ebac Shop - Carrinho", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("h3 > span").should("contain", "Produtos em destaque");
  });

  it("Deve adicionar 3 produtos diferentes no carrinho com sucesso", () => {
    const produtos = ["MacBook Air M1", "MacBook Air M3", "Teste_01"];

    produtos.forEach((produto) => {
      cy.addProdutoCarrinhoByTitle(produto);
    });

    cy.get('a[title="View your shopping cart"]').click();

    produtos.forEach((produto) => {
      cy.get(".product-details").should("contain", produto);
    });
  });
});
