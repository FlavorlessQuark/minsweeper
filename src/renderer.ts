export const render_loop = () =>
{
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const ctx = canvas?.getContext("2d");

    if (ctx)
    {
        ctx.fillStyle = "green";
        ctx.fillRect(10, 10, 150, 100);
    }

    requestAnimationFrame(render_loop)
}
