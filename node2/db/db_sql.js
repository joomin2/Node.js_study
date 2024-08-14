//MySQL_DB와 통신하는 Query문 
module.exports = {
    cust_select:'SELECT * FROM cust',
    cust_select_one:'SELECT * FROM cust WHERE id = ?',
    cust_insert:'INSERT INTO cust VALUES (?,?,?,?)',
    cust_update:'UPDATE cust SET pwd=?, name=?, acc=? WHERE id=?',
    cust_delete:'DELETE FROM cust WHERE id = ?',

    item_select: 'SELECT id,name,price, imgname, date_format(regdate, "%Y-%m-%d") as regdate FROM item',
    item_select_one: 'SELECT id,name,price, imgname, date_format(regdate, "%Y년%m월%d일 %H:%i:%s") as regdate FROM item WHERE id = ?',
    item_insert: 'INSERT INTO item VALUES (0, ?,?,?, SYSDATE())',
    item_update: 'UPDATE item SET name=?, price=?, imgname=? WHERE id=?',
    item_delete: 'DELETE FROM item WHERE id=?',

    cart_select : 'SELECT * FROM cart',
    cart_select_one:'SELECT id,itemid,itemname,itemprice,count,totalprice,date_format(regdate, "%Y년%m월%d일 %H:%i:%s") as regdate FROM cart WHERE userid = ?',
    cart_insert : 'INSERT INTO cart VALUES (0,?,?,?,?,?,?,SYSDATE())',
    cart_delete : 'DELETE FROM cart WHERE id=?'
}   






