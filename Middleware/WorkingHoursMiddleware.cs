namespace ReactMagazine.Middleware
{
    public class WorkingHoursMiddleware
    {
        /// <summary>
        /// Класс отслеживающий время обращения к api
        /// </summary>
        public readonly RequestDelegate _next;

        public WorkingHoursMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var currentTime = DateTime.Now.TimeOfDay;

            if (currentTime < new TimeSpan(8, 0, 0) || currentTime > new TimeSpan(20, 0, 0))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Магазин работает с 8:00 утра до 20:00 вечера");
                return;
            }

            await _next(context);
        }
    }
}
