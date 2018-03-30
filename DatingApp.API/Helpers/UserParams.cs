namespace DatingApp.API.Helpers
{
    public class UserParams
    {
        public int UserId { get; set; }
        private int MaxPageSize { get; set; } = 100;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 4;
        public int PageSize 
            { 
                get {return pageSize;}
                set {pageSize = (value > MaxPageSize) ? MaxPageSize : value ;}
            }

        public string Gender { get; set; }   

        public string Age { get; set; }

        public int MinAge { get; set; } = 18;

        public int MaxAge { get; set; } = 99;
    }
}