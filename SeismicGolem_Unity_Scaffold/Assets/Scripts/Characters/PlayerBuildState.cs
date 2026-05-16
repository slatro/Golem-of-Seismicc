using System.Collections.Generic;
using UnityEngine;

namespace SeismicGolem.Characters
{
    public sealed class PlayerBuildState : MonoBehaviour
    {
        [SerializeField] private List<string> activeBodyMutations = new();
        [SerializeField] private List<string> activeCoreMutations = new();
        [SerializeField] private List<string> activeRelics = new();

        public IReadOnlyList<string> ActiveBodyMutations => activeBodyMutations;
        public IReadOnlyList<string> ActiveCoreMutations => activeCoreMutations;
        public IReadOnlyList<string> ActiveRelics => activeRelics;

        public void AddBodyMutation(string mutationId) => activeBodyMutations.Add(mutationId);
        public void AddCoreMutation(string mutationId) => activeCoreMutations.Add(mutationId);
        public void AddRelic(string relicId) => activeRelics.Add(relicId);
    }
}
