using wipmanagement.api.DTOs;

namespace wipmanagement.api.Interfaces.Services
{
    public interface IRackService
    {
        Task<RackDto> CreateAsync(RackCreateDto dto);
        Task<IEnumerable<RackDto>> GetAllAsync();
        Task<RackDto?> GetByIdAsync(int id);
        Task<RackDto> UpdateAsync(RackUpdateDto dto);
        Task<IEnumerable<RackDto>> GetSuggestedRacksAsync(int quantity);
        Task<bool> SoftDeleteAsync(int id);
    }
}
