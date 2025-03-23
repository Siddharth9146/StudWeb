def StudInfoSerializer(StudInfo) -> dict:
    return {
        "id": str(StudInfo['_id']),
        "name": StudInfo['name'], # "name" is the name of the student
        "phone": StudInfo['phone'],
        "tenth_grade": StudInfo['tenth_grade'],
        "twelfth_grade": StudInfo['twelfth_grade'],
        "exam_score": StudInfo.get('exam_score', 0),
        "exam_name": StudInfo.get('exam_name', ""),
        "state": StudInfo['state'],
        "preferred_degrees": StudInfo['preferred_degrees'] if 'preferred_degrees' in StudInfo else StudInfo.get('preferred_degree', []),  # Support both old and new field names
        "preferred_facilities": StudInfo['preferred_facilities'] if 'preferred_facilities' in StudInfo else StudInfo.get('facilities_pref', [])  # Support both old and new field names
    }
def StudsInfoSerializer(StudsInfo) -> list:
    return [StudInfoSerializer(StudInfo) for StudInfo in StudsInfo]

def UniInfoSerializer(UniInfo) -> dict:
    return {
        "id": str(UniInfo['_id']),
        "name": str(UniInfo['name']),
        "state": str(UniInfo['state']),
        "nirf_ranking": int(UniInfo['nirf_ranking']),
        "degrees_offered": UniInfo.get('degrees_offered', []),  # List of degrees offered by university
        "campus_size": int(UniInfo['campus_size']),
        "facilities_offered": UniInfo.get('facilities_offered', []),  # List of facilities offered by university
        "required_12th": int(UniInfo['required_12th'])
    }

def UnisInfoSerializer(UnisInfo) -> list:
    return [UniInfoSerializer(UniInfo) for UniInfo in UnisInfo]

