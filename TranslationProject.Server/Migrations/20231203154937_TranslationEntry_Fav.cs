using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TranslationProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class TranslationEntry_Fav : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isFavorite",
                table: "TranslationEntries",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isFavorite",
                table: "TranslationEntries");
        }
    }
}
