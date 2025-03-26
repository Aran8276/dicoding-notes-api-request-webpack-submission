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
        color:rgb(94, 52, 52);
    }
    small {
        color: #7f8c8d;
        display: block;
        margin-top: 1rem;
        text-align: right;
    }
    button {
        font-size: 17px;
        padding: 0.7em 1.5em;
        font-weight: 500;
        background: #1f2937;
        color: white;
        border: none;
        position: relative;
        overflow: hidden;
        border-radius: 0.6em;
        cursor: pointer;
    }

    .gradient {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 0.6em;
        margin-top: -0.25em;
        background-image: linear-gradient(
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.3)
        );
    }

    .label {
        position: relative;
        top: -1px;
        }

        .transition {
        transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        transition-duration: 500ms;
        background-color: rgba(255, 0, 0, 0.84);
        border-radius: 9999px;
        width: 0;
        height: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    button:hover .transition {
        width: 14em;
        height: 14em;
    }

    button:active {
        transform: scale(0.97);
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
        height: 50px;
        padding: 0.5rem;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    button[disabled] {
        background:rgb(153, 226, 155);
        cursor: default;
    
    }
</style>`;

const loaderStyle = `
<style>
    .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin: 0 10px;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>`;

export { listStyle, formStyle, itemStyle, loaderStyle };
