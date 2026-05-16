using UnityEngine;

namespace SeismicGolem.Core
{
    public sealed class GameBootstrap : MonoBehaviour
    {
        [SerializeField] private GameFlowController gameFlowController;

        private void Awake()
        {
            if (gameFlowController == null)
            {
                Debug.LogWarning("GameFlowController reference is missing on GameBootstrap.");
            }
        }
    }
}
