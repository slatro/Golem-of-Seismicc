using UnityEngine;

namespace SeismicGolem.Rooms
{
    public sealed class RoomManager : MonoBehaviour
    {
        [SerializeField] private string roomId = "prototype_room";

        public void ActivateRoom()
        {
            Debug.Log($"Room activated: {roomId}");
        }

        public void CompleteRoom()
        {
            Debug.Log($"Room completed: {roomId}");
        }
    }
}
