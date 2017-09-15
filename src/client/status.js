
const el = document.getElementById('status');
export default {
    log(str) {
        el.style.color = 'black';
        el.textContent = str;
    },
    ok(str) {
        el.style.color = 'green';
        el.textContent = str;
    },
    error(str) {
        el.style.color = 'red';
        el.textContent = str;
    }
}