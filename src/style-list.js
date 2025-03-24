// style utk setiap card disini, bisa diganti :D

const itemStyle = `
<style>
    .note {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 1rem;
        margin: 0.5rem;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h3 {
        margin: 0 0 0.5rem;
        color: #2c3e50;
    }
    p {
        margin: 0 0 0.5rem;
        color: #34495e;
    }
    small {
        color: #7f8c8d;
        display: block;
        margin-top: 1rem;
        text-align: right;
    }
</style>`;

const listStyle = `
<style>
    .notes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }
</style>`;

const formStyle = `
<style>
    form {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        margin: 1rem 0;
    }
    input, textarea {
        padding: 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 4px;
    }
    button {
        padding: 0.5rem;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>`;

export { listStyle, formStyle, itemStyle };
