using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DatingApp.API.Migrations
{
    public partial class updateUserMode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Introduction",
                table: "Users",
                newName: "KnownAs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "KnownAs",
                table: "Users",
                newName: "Introduction");
        }
    }
}
