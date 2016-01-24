import 'babel-core/register';
import test from 'ava';
import TempMap from '../src/temp-map';

test('should not create without time', t => {
    t.throws(() => {
        new TempMap(); // eslint-disable-line no-new
    }, /Invalid value used as expire time/);
});

test('should set value', t => {
    const map = new TempMap(50);
    const key = { a: 'b' };
    const value = [ 1, 2, 3 ];

    map.set(key, value);

    t.ok(map.has(key));
});

test('should add key only once', t => {
    const map = new TempMap(50);
    const key = { a: 'b' };
    const value = [ 1, 2, 3 ];

    map.set(key, value);
    map.set(key, value);
    map.delete(key);

    t.notOk(map.has(key));
});

test('should get value', t => {
    const map = new TempMap(10);
    const key = { a: 'b' };
    const value = [ 1, 2, 3 ];

    map.set(key, value);

    t.same(map.get(key), value);
});

test('should delete value', t => {
    const map = new TempMap(10);
    const key = { a: 'b' };
    const value = [ 1, 2, 3 ];

    map.set(key, value);
    map.delete(key);

    t.notOk(map.has(key));
});

test.cb('should expire value', t => {
    const map = new TempMap(10);
    const key = { a: 'b' };
    const value = [ 1, 2, 3 ];

    map.set(key, value);

    setTimeout(() => {
        t.notOk(map.has(key));
        t.end();
    }, 20);
});

test.cb('should not expire value before time', t => {
    const map = new TempMap(50);
    const key = { a: 'b' };
    const value = [ 1, 2, 3 ];

    map.set(key, value);

    setTimeout(() => {
        t.ok(map.has(key));
        t.end();
    }, 10);
});
