namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikerId { get; set; } //lubi
        public int LikeeId { get; set; } //polubieni
        public User Liker { get; set; } // osoba która polubiła
        public User Likee{ get; set; } // osoby polubione
    }
}