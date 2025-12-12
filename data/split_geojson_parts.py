import json
import os
import math

input_file = 'data/heatmap_1.geojson'
output_dir = 'data/tiles'
num_parts = 30

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Clean up existing tiles
for f in os.listdir(output_dir):
    if f.endswith(".geojson"):
        os.remove(os.path.join(output_dir, f))

print(f"Reading {input_file}...")
with open(input_file, 'r') as f:
    data = json.load(f)

features = data['features']
total_features = len(features)
print(f"Total features: {total_features}")

chunk_size = math.ceil(total_features / num_parts)
print(f"Splitting into {num_parts} parts of approx {chunk_size} features each.")

for i in range(num_parts):
    start_idx = i * chunk_size
    end_idx = min((i + 1) * chunk_size, total_features)
    
    chunk_features = features[start_idx:end_idx]
    
    if not chunk_features:
        break
        
    filename = f"heatmap_part_{i+1}.geojson"
    filepath = os.path.join(output_dir, filename)
    
    feature_collection = {
        "type": "FeatureCollection",
        "features": chunk_features
    }
    
    with open(filepath, 'w') as f:
        json.dump(feature_collection, f, separators=(',', ':'))
    
    print(f"Saved {filename} ({len(chunk_features)} features)")

print("Done.")
