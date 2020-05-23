exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("users").insert([
    {
      username: "jandoe",
      password: "$2a$08$DHjCQ5RWVjigsXmRkvqYsu/zFJRGng7AOHGspi3gcg.jomKofBz6W",
    },
  ]);
};
