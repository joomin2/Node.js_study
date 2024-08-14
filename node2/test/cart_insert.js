var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();



let id = 'example_id';
let itemid = 'example_itemid';
let count = 'example_count';

let values = [itemid];

conn.query(db_sql.item_select_one, values, (e, result, fields) => {
    try {
        if (e) {
            console.log('Select_one Error');
            throw e;
        } else {
            console.log(result[0]);
            console.log(result[0].name);
            console.log(result[0].price);
            console.log(result[0].price * count);

            let values = [id, itemid, result[0].name, result[0].price, count, result[0].price * count];

            conn.query(db_sql.cart_insert, values, (e, result, fields) => {
                try {
                    if (e) {
                        console.log('Insert Error');
                        throw e;
                    } else {
                        console.log('Insert OK !');
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }
    } catch (e) {
        console.log(e);
    } finally {
        db_connect.close(conn);
    }
});