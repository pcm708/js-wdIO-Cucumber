import faker from'faker';

    let testdata={
        email: faker.internet.userName()+"@yopmail.com",
        gender: "Mr.",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: "Password1!",
        address: faker.address.secondaryAddress(),
        city: faker.address.city(),
        alias: faker.internet.userName()+"@yopmail.com",
    }
module.exports=testdata;