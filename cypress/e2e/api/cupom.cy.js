/// <reference types="cypress" />
import { v4 as uuidv4 } from "uuid";
import { couponEndPoint } from "../../fixtures/endpoints.json";

describe("API - Coupons", () => {
  const codeName = uuidv4();
  const amountCoupon = "10.00";
  const descriptionCoupon = "Cupom do Desafio";

  it("POST - Coupons", () => {
    cy.createCouponApi(codeName, amountCoupon, descriptionCoupon).then(({ status, body }) => {
      expect(status).to.eq(201);
      expect(body.code).to.eq(codeName);
      expect(body.amount).to.eq(amountCoupon);
      expect(body.description).to.eq(descriptionCoupon);
    });
  });

  it("DELETE - Coupons", () => {
    cy.createCouponApi(codeName, amountCoupon, descriptionCoupon).then(({ body }) => {
      if (body?.id) {
        const idCoupon = body.id;

        cy.request({
          method: "DELETE",
          url: `${couponEndPoint}/${idCoupon}?force=true`,
          headers: {
            authorization: `Basic ${Cypress.env("tokenApi")}`,
          },
        }).then(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.id).to.eq(idCoupon);
          expect(body.code).to.eq(codeName);
          expect(body.amount).to.eq(amountCoupon);
          expect(body.description).to.eq(descriptionCoupon);
        });
      }
    });
  });

  it.only("GET - Coupons", () => {
    cy.request({
      method: "GET",
      url: couponEndPoint,
      headers: {
        authorization: `Basic ${Cypress.env("tokenApi")}`,
      },
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.be.an("array");

      if (body.length > 0) {
        expect(body[0]).to.include.all.keys(
          "id",
          "code",
          "amount",
          "date_created",
          "date_created_gmt",
          "date_modified",
          "date_modified_gmt",
          "discount_type",
          "description"
        );
      }
    });
  });
});
