using SeismicGolem.Characters;
using UnityEngine;

namespace SeismicGolem.Progression
{
    public sealed class UpgradeManager : MonoBehaviour
    {
        [SerializeField] private PlayerBuildState playerBuildState;

        public void GrantBodyMutation(string mutationId)
        {
            if (playerBuildState == null)
            {
                Debug.LogWarning("PlayerBuildState reference is missing.");
                return;
            }

            playerBuildState.AddBodyMutation(mutationId);
        }
    }
}
