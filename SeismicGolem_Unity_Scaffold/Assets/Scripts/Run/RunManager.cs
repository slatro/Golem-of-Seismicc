using UnityEngine;

namespace SeismicGolem.Run
{
    public sealed class RunManager : MonoBehaviour
    {
        [SerializeField] private int currentRoomIndex;

        public int CurrentRoomIndex => currentRoomIndex;

        public void AdvanceRoom()
        {
            currentRoomIndex++;
            Debug.Log($"Advanced to room index {currentRoomIndex}");
        }
    }
}
