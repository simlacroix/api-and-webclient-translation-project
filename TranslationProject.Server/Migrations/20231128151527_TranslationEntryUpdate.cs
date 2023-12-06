using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TranslationProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class TranslationEntryUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TranslationEntries_AspNetUsers_UserId",
                table: "TranslationEntries");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "TranslationEntries",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TranslationEntries_AspNetUsers_UserId",
                table: "TranslationEntries",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TranslationEntries_AspNetUsers_UserId",
                table: "TranslationEntries");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "TranslationEntries",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_TranslationEntries_AspNetUsers_UserId",
                table: "TranslationEntries",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
