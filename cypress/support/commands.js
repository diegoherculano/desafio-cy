import { couponEndPoint } from "../fixtures/endpoints.json";

Cypress.Commands.add("addProdutoCarrinhoByTitle", (title) => {
  cy.get(`a[title="${title}"]`).first().click();
  cy.get('button[name="add-to-cart"]').click();
  cy.contains("a", "Início").click();
  cy.get("h3 > span").should("contain", "Produtos em destaque");
});

Cypress.Commands.add("createCouponApi", (codeName, amountCoupon, descriptionCoupon) => {
  return cy.request({
    method: "POST",
    url: couponEndPoint,
    headers: {
      authorization: `Basic ${Cypress.env("tokenApi")}`,
    },
    qs: {
      code: codeName,
      amount: amountCoupon,
      discount_type: "percent",
      description: descriptionCoupon,
    },
    failOnStatusCode: false,
  });
});
