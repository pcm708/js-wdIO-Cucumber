Feature: Payment Feature

  Scenario: Payment Details Verification Test

    Given I am on the application page
    When I click on SignIn Btn
    And I input eMail Address and click on Create Account btn
    And I fill personal Information
    And I search an item and add to cart
    Then I validate on the payments page if the product details are correct.
